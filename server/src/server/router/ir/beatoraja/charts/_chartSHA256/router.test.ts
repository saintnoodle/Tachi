import db from "external/mongo/db";
import t from "tap";
import mockApi from "test-utils/mock-api";
import ResetDBState from "test-utils/resets";
import type { PBScoreDocument, ScoreDocument } from "tachi-common";

t.test("GET /ir/beatoraja/charts/:chartSHA256/scores", (t) => {
	t.beforeEach(ResetDBState);
	t.beforeEach(() =>
		db["api-tokens"].insert({
			userID: 1,
			identifier: "Mock API Beatoraja Token",
			permissions: {
				submit_score: true,
			},
			token: "mock_token",
			fromAPIClient: null,
		})
	);

	const GAZER_SHA256 = "195fe1be5c3e74fccd04dc426e05f8a9cfa8a1059c339d0a23e99f63661f0b7d";
	const GAZER_CHARTID = "88eb6cc5683e2740cbd07f588a5f3db1db8d467b";

	t.test("Should return PB scores on a chart", async (t) => {
		// very lazy fake scores
		await db["personal-bests"].insert({
			composedFrom: [{ name: "Best Lamp", scoreID: "mock_lampPB" }],
			scoreData: {
				score: 1234,
				enumIndexes: {
					lamp: 4,
				},
				optional: {
					enumIndexes: {},
				},
			},
			scoreMeta: {},
			chartID: GAZER_CHARTID,
			userID: 1,
		} as unknown as PBScoreDocument);

		await db.scores.insert({
			scoreID: "mock_lampPB",
			scoreMeta: {
				inputDevice: "BM_CONTROLLER",
				random: "MIRROR",
			},
		} as ScoreDocument);

		const res = await mockApi
			.get(`/ir/beatoraja/charts/${GAZER_SHA256}/scores`)
			.set("Authorization", "Bearer mock_token")
			.set("X-TachiIR-Version", "v2.0.0");

		t.equal(res.status, 200);

		t.hasStrict(res.body.body, [
			{
				player: "",
				clear: 5,
				epg: 617,
				lpg: 0,
			},
		]);

		t.end();
	});

	t.test("Should return 404 if chart doesnt exist", async (t) => {
		const res = await mockApi
			.get(`/ir/beatoraja/charts/INVALID/scores`)
			.set("Authorization", "Bearer mock_token")
			.set("X-TachiIR-Version", "v2.0.0");

		t.equal(res.status, 404);

		t.end();
	});

	t.end();
});
