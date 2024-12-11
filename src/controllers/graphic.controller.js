import Restaurant from '../models/restaurants.model.js'
import User from '../models/user.model.js'
import Incident from '../models/incident.model.js'
import Offer from '../models/offer.model.js'
import Match from '../models/match.model.js'

export const getStats = async (req, res) => {
  try {
    const today = new Date();
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1, 0, 0, 0); 

    const totalIncidents = await Incident.countDocuments({date: { $gte: thisMonthStart, $lt: thisMonthEnd } });
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalMatchs = await Match.countDocuments();

    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0); 
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0); 
    
    const usersLastMonth = await User.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } });
    const restaurantsLastMonth = await Restaurant.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } });
    const matchsLastMonth = await Match.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } });
    const incidentsLastMonth = await Incident.countDocuments({ date: { $gte: lastMonthStart, $lt: lastMonthEnd } });
    
    const calculatePercentageChange = (total, previousTotal) => {
      if (previousTotal === 0) {
        return total > 0 ? 100 : 0; 
      }
      return ((total - previousTotal) / previousTotal * 100).toFixed(2);
    };

    res.json({
      totalUsers,
      userChange: calculatePercentageChange(totalUsers, usersLastMonth),
      totalRestaurants,
      restaurantChange: calculatePercentageChange(totalRestaurants, restaurantsLastMonth),
      totalMatchs,
      matchsChange: calculatePercentageChange(totalMatchs, matchsLastMonth),
      totalIncidents,
      incidentsChange: calculatePercentageChange(totalIncidents, incidentsLastMonth),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stats', error });
  }
};

export const graphicLine = async (req, res) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const restaurantGrowth = await Restaurant.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const response = { userGrowth, restaurantGrowth };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el crecimiento mensual" });
  }
};

export const graphicBar = async (req, res) => {
  try {
    const topCuisines = await Restaurant.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(topCuisines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los tipos de cocina más populares" });
  }
}

export const graphicArea = async (req, res) => {
  try {
      const monthlyIncidences = await Incident.aggregate([
          {
              $group: {
                  _id: { $month: "$date" },
                  count: { $sum: 1 }
              }
          },
          { $sort: { _id: 1 } }
      ]);

      const months = Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          count: 0
      }));

      monthlyIncidences.forEach(item => {
          const index = item._id - 1; 
          months[index].count = item.count;
      });

      res.json(months);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const graphicPie = async (req, res) => {
  try {
    const ratingRanges = [
      { range: "1 - 2", min: 1, max: 2 },
      { range: "2 - 3", min: 2, max: 3 },
      { range: "3 - 4", min: 3, max: 4 },
      { range: "4 - 5", min: 4, max: 5 }
    ];

    const ratingsDistribution = await Restaurant.aggregate([
      {
        $project: {
          ratingRange: {
            $switch: {
              branches: [
                { case: { $and: [{ $gte: ["$qualification", 1] }, { $lt: ["$qualification", 2] }] }, then: "1 - 2" },
                { case: { $and: [{ $gte: ["$qualification", 2] }, { $lt: ["$qualification", 3] }] }, then: "2 - 3" },
                { case: { $and: [{ $gte: ["$qualification", 3] }, { $lt: ["$qualification", 4] }] }, then: "3 - 4" },
                { case: { $and: [{ $gte: ["$qualification", 4] }, { $lte: ["$qualification", 5] }] }, then: "4 - 5" }
              ],
              default: "No disponible"
            }
          }
        }
      },
      {
        $group: {
          _id: "$ratingRange",
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedData = ratingsDistribution.map(item => ({
      name: item._id,
      value: item.count
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};