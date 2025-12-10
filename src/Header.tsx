import "./App.css"

// Propsの中のchildrenを定義
type Props = {
  children: React.ReactNode;
};

// Headerの中身のことをPropsと呼ぶ
function Header(props: Props) {
  const { children } = props;
  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">MOVIEFLEX</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Header
