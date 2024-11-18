import * as styles from "./Header.style"
import Link from "next/link";


export default function LayoutHeader(): JSX.Element {
  return (
    <styles.HeaderWrapper>
      <styles.Container>
        <styles.Title>My Project</styles.Title>
        <styles.Nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </styles.Nav>
      </styles.Container>
    </styles.HeaderWrapper>
  );
}