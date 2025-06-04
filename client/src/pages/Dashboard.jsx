import { useEffect, useState } from "react"
import Navigation from "../components/Navbar"
import ReportDashboard from "../components/ReportDashboard"
import CardInfo from "../components/CardInfo"
import { getSalesWithProfit, getShopWithIncrement, getProfitMargin } from "../services/reportService"

const Dashboard = () => {
  const [sales, setSales] = useState(null)
  const [shop, setShop] = useState(null)
  const [profitMargin, setProfitMargin] = useState(null)
  
  useEffect(() => {
    (async () => {
      try {
        const responseSales = await getSalesWithProfit()
        const responseShop = await getShopWithIncrement()
        const responseMargin = await getProfitMargin()
        setSales(responseSales)
        setShop(responseShop)
        setProfitMargin(responseMargin)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <main className="grid grid-cols-12">
      <Navigation />
      <div className="col-span-9">
        <h1 className="title">Dashboard</h1>
        <div className="col-span-9 overflow-y-auto">
          <div className="p-8 pb-0 flex justify-between">
            <CardInfo data={sales} />
            <CardInfo data={shop} />
            <CardInfo data={profitMargin} />
          </div>
          <ReportDashboard />
        </div>
      </div>
    </main>
  )
}

export default Dashboard