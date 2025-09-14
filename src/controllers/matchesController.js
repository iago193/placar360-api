class MatchesController {
  // Jogos ao vivo
  async live(req, res) {
    await this.fetchMatches(`${process.env.BASE_URL}/fixtures?live=all`, res);
  }

  // Próximos jogos
  async upcoming(req, res) {
    await this.fetchMatches(`${process.env.BASE_URL}/fixtures?next=10`, res);
  }

  // Últimos resultados
  async results(req, res) {
    await this.fetchMatches(`${process.env.BASE_URL}/fixtures?last=10`, res);
  }

  // Detalhes de um jogo
  async details(req, res) {
    const { id } = req.params;
    await this.fetchMatches(`${process.env.BASE_URL}/fixtures?id=${id}`, res);
  }

  // Função auxiliar para não repetir código
  async fetchMatches(url, res) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "x-apisports-key": process.env.API_KEY },
      });

      if (!response.ok) {
        throw new Error(`Erro na API externa: ${response.statusText}`);
      }

      const { response: matches } = await response.json();

      const formatted = matches.map((match) => ({
        fixtureId: match.fixture.id,
        league: match.league.name,
        country: match.league.country,
        season: match.league.season,
        round: match.league.round,
        status: match.fixture.status.long,
        elapsed: match.fixture.status.elapsed,
        date: match.fixture.date,
        homeTeam: {
          name: match.teams.home.name,
          logo: match.teams.home.logo,
          goals: match.goals.home,
        },
        awayTeam: {
          name: match.teams.away.name,
          logo: match.teams.away.logo,
          goals: match.goals.away,
        },
      }));

      res.json({ success: true, count: formatted.length, data: formatted });
    } catch (err) {
      console.error("Erro ao buscar jogos:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export default new MatchesController();
