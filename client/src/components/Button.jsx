const Button = ({ text, onClick }) => {
  return (
    <button className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-secundary transition" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button