import Navigation from "../components/Navbar"
import ReportDashboard from "../components/ReportDashboard"

const Dashboard = () => {
  return (
    <main className="grid grid-cols-12">
      <Navigation />
      <div className="col-span-9">
        <h1 className="title">Dashboard</h1>
        <div className="col-span-9">
          <ReportDashboard />
        </div>
      </div>
    </main>
  )
}

export default Dashboard