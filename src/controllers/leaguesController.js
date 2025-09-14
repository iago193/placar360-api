class LeaguesController {
  // listar ligas (pode filtrar por país, se quiser)
  async index(req, res) {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/leagues?country=Brazil`,
        {
          method: "GET",
          headers: { "x-apisports-key": process.env.API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API externa: ${response.statusText}`);
      }

      const { response: leagues } = await response.json();

      const formatted = leagues.map((league) => ({
        id: league.league.id,
        name: league.league.name,
        type: league.league.type, // Liga ou Copa
        logo: league.league.logo,
        country: league.country.name,
        season: league.seasons.slice(-1)[0].year, // pega última temporada
      }));

      res.json({ success: true, count: formatted.length, data: formatted });
    } catch (err) {
      console.error("Erro ao buscar ligas:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // tabela de classificação da liga
  async standings(req, res) {
    try {
      const { id, season } = req.params;

      const response = await fetch(
        `${process.env.BASE_URL}/standings?league=${id}&season=${season}`,
        {
          method: "GET",
          headers: { "x-apisports-key": process.env.API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API externa: ${response.statusText}`);
      }

      const { response: standings } = await response.json();

      res.json({ success: true, data: standings });
    } catch (err) {
      console.error("Erro ao buscar classificação:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default new LeaguesController();
