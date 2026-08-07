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
        <h2>Últimas Propostas</h2>

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
            <S.Item key={proposal.id}>
              <div>
                <strong>
                  {proposal.fullName}
                </strong>

                <span>
                  {proposal.projectType}
                </span>
              </div>

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