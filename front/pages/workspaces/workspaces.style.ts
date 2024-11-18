import styled from '@emotion/styled'


export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const WorkspaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

export const WorkspaceCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const WorkspaceTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const WorkspaceUpdatedAt = styled.p`
  font-size: 0.875rem;
  color: #777;
`;

export const CreateButton = styled.button`
  margin-top: 24px;
  padding: 12px 16px;
  background-color: #3b82f6; /* Tailwind's blue-500 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb; /* Tailwind's blue-600 */
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;