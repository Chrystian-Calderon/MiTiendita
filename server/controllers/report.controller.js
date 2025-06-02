class ReportController {
  constructor({ reportModel }) {
    this.model = reportModel;
  }

  getCostsAndSales = async (req, res) => {
    const { type } = req.body;
    console.log(req.body)
    try {
      if (type === 'day') {
        const resultSales = await this.model.salesPerDay();
        const resultCosts = await this.model.costsPerDay();
        return res.status(200).json({ sales: resultSales, costs: resultCosts });
      } else {
        const resultSales = await this.model.salesPerMonth();
        const resultCosts = await this.model.costsPerMonth();
        return res.status(200).json({ sales: resultSales, costs: resultCosts });
      }
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los costos y ventas' });
    }
  }

  getBestSellingProducts = async (req, res) => {
    const { limit } = req.body;
    console.log(limit)
    try {
      const result = await this.model.bestSellingProducts(limit);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los productos más vendidos' });
    }
  }
  
  getBestSellingDishes = async (req, res) => {
    const { limit } = req.body;
    console.log(limit)
    try {
      const result = await this.model.bestSellingDishes(limit);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los platos más vendidos' });
    }
  }
}

export default ReportController;