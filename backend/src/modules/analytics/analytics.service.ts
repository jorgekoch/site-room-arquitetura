import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = process.env.GOOGLE_ANALYTICS_PROPERTY_ID?.trim();
const CLIENT_EMAIL = process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL?.trim();
const PRIVATE_KEY = process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(/\\n/g, "\n");

type AnalyticsDay = {
  date: string;
  users: number;
  sessions: number;
  views: number;
};

type AnalyticsPage = {
  path: string;
  views: number;
};

export type AnalyticsOverview = {
  configured: boolean;
  range: number;
  totals: {
    users: number;
    sessions: number;
    views: number;
  };
  daily: AnalyticsDay[];
  topPages: AnalyticsPage[];
};

export class AnalyticsService {
  private client?: BetaAnalyticsDataClient;

  private getClient() {
    if (!PROPERTY_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      return undefined;
    }

    if (!this.client) {
      this.client = new BetaAnalyticsDataClient({
        credentials: {
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY,
        },
      });
    }

    return this.client;
  }

  async getOverview(range = 30): Promise<AnalyticsOverview> {
    const safeRange = Math.min(Math.max(range, 7), 90);
    const client = this.getClient();

    if (!client || !PROPERTY_ID) {
      return {
        configured: false,
        range: safeRange,
        totals: { users: 0, sessions: 0, views: 0 },
        daily: [],
        topPages: [],
      };
    }

    const property = `properties/${PROPERTY_ID}`;
    const dateRanges = [
      { startDate: `${safeRange - 1}daysAgo`, endDate: "today" },
    ];

    const [totalsResponse, dailyResponse, pagesResponse] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [
          {
            metric: {
              metricName: "screenPageViews",
            },
            desc: true,
          },
        ],
        limit: 10,
      }),
    ]);

    const totalsRow = totalsResponse[0].rows?.[0];

    const daily: AnalyticsDay[] = (dailyResponse[0].rows ?? []).map((row) => ({
      date: row.dimensionValues?.[0]?.value ?? "",
      users: Number(row.metricValues?.[0]?.value ?? 0),
      sessions: Number(row.metricValues?.[1]?.value ?? 0),
      views: Number(row.metricValues?.[2]?.value ?? 0),
    }));

    const topPages: AnalyticsPage[] = (pagesResponse[0].rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || "/",
      views: Number(row.metricValues?.[0]?.value ?? 0),
    }));

    return {
      configured: true,
      range: safeRange,
      totals: {
        users: Number(totalsRow?.metricValues?.[0]?.value ?? 0),
        sessions: Number(totalsRow?.metricValues?.[1]?.value ?? 0),
        views: Number(totalsRow?.metricValues?.[2]?.value ?? 0),
      },
      daily,
      topPages,
    };
  }
}
