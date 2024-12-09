import LayoutHeader from "./Header";
// import LayoutFooter from "./Footer";
import * as styles from "./layout.style";


interface ILayoutProps {
    children: JSX.Element;
}


export default function Layout(props: ILayoutProps): JSX.Element {
    return (
        <styles.layout>
            <LayoutHeader />
            <styles.content>{props.children}</styles.content>
            {/* <LayoutFooter /> */}
        </styles.layout>
    )
}