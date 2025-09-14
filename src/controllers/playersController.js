class PlayersController {
  // Top artilheiros de uma liga
  async topScorers(req, res) {
    const { league, season } = req.query; // exemplo: ?league=71&season=2025
    await this.fetchData(
      `${process.env.BASE_URL}/players/topscorers?league=${league}&season=${season}`,
      res
    );
  }

  // Top assistências
  async topAssists(req, res) {
    const { league, season } = req.query;
    await this.fetchData(
      `${process.env.BASE_URL}/players/topassists?league=${league}&season=${season}`,
      res
    );
  }

  // Informações de um jogador específico
  async details(req, res) {
    const { id } = req.params; // /players/276
    await this.fetchData(
      `${process.env.BASE_URL}/players?id=${id}`,
      res
    );
  }

  // Plantel de um time
  async squad(req, res) {
    const { team, season } = req.query; // ?team=33&season=2025
    await this.fetchData(
      `${process.env.BASE_URL}/players/squads?team=${team}&season=${season}`,
      res
    );
  }

  // Método auxiliar para não duplicar código
  async fetchData(url, res) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "x-apisports-key": process.env.API_KEY },
      });

      if (!response.ok) {
        throw new Error(`Erro na API externa: ${response.statusText}`);
      }

      const { response: data } = await response.json();

      res.json({
        success: true,
        count: data.length,
        data,
      });
    } catch (err) {
      console.error("Erro ao buscar dados de jogadores:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default new PlayersController();
