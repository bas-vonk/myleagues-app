export const league = {
  name: "Test league",
  rankingSystem: "perron_frobenius",
};

export const leagueResponse = {
  data: {
    attributes: {
      admin_user_id: "697b38db-2e54-40e3-a4fb-82617c7a3a1b",
      created_at: 1634928428,
      deleted_at: null,
      id: "94f478ab-7806-45f5-93ab-3d546e424b08",
      join_code: "L1X2",
      matches: [],
      name: "Test league",
      players: [
        {
          id: "697b38db-2e54-40e3-a4fb-82617c7a3a1b",
          username: "root",
        },
      ],
      ranking: [
        {
          league_id: "94f478ab-7806-45f5-93ab-3d546e424b08",
          player_id: "697b38db-2e54-40e3-a4fb-82617c7a3a1b",
          position: 1,
          pts_primary: 1000,
          pts_secondary: 0,
          username: "root",
        },
      ],
      ranking_system: "perron_frobenius",
    },
    id: "94f478ab-7806-45f5-93ab-3d546e424b08",
    type: "leagues",
  },
};
