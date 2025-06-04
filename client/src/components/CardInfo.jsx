const CardInfo = ({ data }) => {
  if (!data) return null

  const type = {
    percentage: {
      format: (value) => `${value}%`
    },
    currency: {
      format: (value) => `Bs ${value}`
    },
    normal: {
      format: (value) => value
    }
  }
  const colorMap = {
    green: "text-green-500",
    red: "text-red-500",
    gray: "text-gray-500"
  };

  const typeConfig = type[data.type]

  return (
    <div className="card-info">
      <h3>{data.label}</h3>
      <p>{typeConfig.format(data.value)}</p>
      <span className={colorMap[data.color]}>{data.description}</span>
    </div>
  )
}

export default CardInfo