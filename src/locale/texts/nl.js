export default {
  components: {
    modals: {
      rankingSystemInformation: {
        title: "Informatie over de ranking systemen",
        body: "Deze modal bevat informatie over de ranking systemen. \
        <br /><br /> \
        <strong>Regular:</strong> \
        <ul> \
        <li>De winnaar krijgt 2 punten, gelijkspel levert elke speler 1 punt op. Secondaire punten worden bepaald door het 'game saldo'</li> \
        <li>De code staat <a href='https://github.com/bas-vonk/myleagues-api/blob/main/myleagues_api/models/ranking_systems/ranking_regular.py' target='_blank'>hier</a>.</li> \
        </ul> \
        <strong>Perron Frobenius:</strong> \
        <ul> \
        <li>Ranking systeem gebaseerd op <a href='http://stat.wharton.upenn.edu/~steele/Courses/956/Ranking/RankingFootballSIAM93.pdf' target='_blank'>dit</a> paper.</li> \
        <li>De code staat <a href='https://github.com/bas-vonk/myleagues-api/blob/main/myleagues_api/models/ranking_systems/ranking_perron_frobenius.py' target='_blank'>hier</a></li> \
        </ul>",
      },
    },
    cards: {
      createLeagueCard: {
        title: "Creëer een league",
        leagueNamePlaceholder: "League naam",
        selectRankingSystem: "Selecteer een ranking systeem.",
      },
    },
  },
};
