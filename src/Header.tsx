// Propsの中のchildrenを定義
type Props = {
  children: React.ReactNode;
};

// Headerの中身のことをPropsと呼ぶ
function Header(props: Props) {
  const { children } = props;
  return (
    <div>
      <header>
        <h1>MOVIEFLEX</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Header
