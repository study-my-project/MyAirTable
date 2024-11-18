import styled from '@emotion/styled'


export const HeaderWrapper = styled.header`
  background-color: #3b82f6;
  color: white;
  padding: 16px 24px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: bold;
`;

export const Nav = styled.nav`
  ul {
    display: flex;
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      a {
        text-decoration: none;
        color: white;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;