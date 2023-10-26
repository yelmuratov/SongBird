import './Header.css'

const Header = () => {
  return (
    <header id='header'>
      <div className="logo">
        <img src="images/logo/logo.svg" alt="logo" />
      </div>
      <div className="score">
        Score:<span>0</span>
      </div>
    </header>
  )
}

export default Header