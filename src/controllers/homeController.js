class Home {

  async index(req, res) {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/fixtures?live=all`,
        {
          method: "GET",
          headers: { "x-apisports-key": process.env.API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na API externa: ${response.statusText}`);
      }

      const { response: matches } = await response.json();

      // Organizar os dados que realmente interessam
      const formatted = matches.map((match) => ({
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

export default new Home();
