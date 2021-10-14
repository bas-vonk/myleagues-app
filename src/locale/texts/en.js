export default {
  components: {
    modals: {
      rankingSystemInformation: {
        title: "Information on ranking systems",
        body: "This modal contains information on different ranking systems. \
        <br /><br /> \
        <strong>Regular:</strong> \
        <ul> \
        <li>Winner gets two points, draw gives 1 point for each player.</li> \
        <li>Code to be found <a href='https://github.com/bas-vonk/myleagues-api/blob/main/myleagues_api/models/ranking_systems/ranking_regular.py' target='_blank'>here</a>.</li> \
        </ul> \
        <strong>Perron Frobenius:</strong> \
        <ul> \
        <li>Ranking system based on <a href='http://stat.wharton.upenn.edu/~steele/Courses/956/Ranking/RankingFootballSIAM93.pdf' target='_blank'>this</a> paper.</li> \
        <li>Code to be found <a href='https://github.com/bas-vonk/myleagues-api/blob/main/myleagues_api/models/ranking_systems/ranking_perron_frobenius.py' target='_blank'>here</a></li> \
        </ul>",
      },
    },
    cards: {
      createLeagueCard: {
        title: "Create league",
        leagueNamePlaceholder: "League name",
        selectRankingSystem: "Select ranking system",
      },
    },
  },
};
