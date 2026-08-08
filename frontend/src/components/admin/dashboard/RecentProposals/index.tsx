import { Link } from "react-router-dom";

import { Proposal } from "../../../../types/proposal";

import * as S from "./styles";

interface RecentProposalsProps {
  proposals: Proposal[];
}

export function RecentProposals({
  proposals,
}: RecentProposalsProps) {
  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Últimas Propostas</h2>

          <span>
            Solicitações recebidas recentemente
          </span>
        </div>

        <Link to="/admin/propostas">
          Ver todas
        </Link>
      </S.Header>

      {proposals.length === 0 ? (
        <S.Empty>
          Nenhuma proposta encontrada.
        </S.Empty>
      ) : (
        <S.List>
          {proposals.map((proposal) => (
            <S.Item
              key={proposal.id}
              to="/admin/propostas"
            >
              <S.ProposalInfo>
                <S.Avatar>
                  {proposal.fullName
                    .trim()
                    .charAt(0)
                    .toUpperCase()}
                </S.Avatar>

                <div>
                  <strong>
                    {proposal.fullName}
                  </strong>

                  <span>
                    {proposal.projectType}
                  </span>
                </div>
              </S.ProposalInfo>

              <S.Status>
                {proposal.status}
              </S.Status>
            </S.Item>
          ))}
        </S.List>
      )}
    </S.Container>
  );
}