import styled from '@emotion/styled'


export const FooterWrapper = styled.footer`
  background-color: #1f2937; /* Tailwind's bg-gray-800 */
  color: white;
  padding: 16px 24px; /* Tailwind's py-4 px-6 */
  text-align: center;
`;

export const FooterText = styled.p`
  margin: 8px 0; /* Tailwind's mt-2 mb-2 */
`;

export const FooterLink = styled.a`
  color: #60a5fa; /* Tailwind's hover:underline */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;