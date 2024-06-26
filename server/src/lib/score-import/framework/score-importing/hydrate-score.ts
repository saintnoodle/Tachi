import { CreateFullScoreData } from "./derivers";
import { CreateScoreCalcData } from "../calculated-data/score";
import { GetGPTString } from "tachi-common";
import type { DryScore } from "../common/types";
import type { KtLogger } from "lib/logger/logger";
import type { ChartDocument, ScoreDocument, SongDocument, integer } from "tachi-common";

/**
 * Takes an "intermediate" score and appends the rest of the data it needs.
 * @param dryScore The intermediate score to make into a real score.
 * @param userID The userID this score is for.
 */
export function HydrateScore(
	userID: integer,
	dryScore: DryScore,
	chart: ChartDocument,
	song: SongDocument,
	scoreID: string,
	logger: KtLogger
): ScoreDocument {
	const gpt = GetGPTString(dryScore.game, chart.playtype);

	const scoreData = CreateFullScoreData(gpt, dryScore.scoreData, chart, logger);

	const calculatedData = CreateScoreCalcData(dryScore.game, dryScore.scoreData, chart);

	const score: ScoreDocument = {
		...dryScore,

		// then push our new score data.
		scoreData,

		// everything below this point is sane
		highlight: false,
		timeAdded: Date.now(),
		userID,
		calculatedData,
		songID: song.id,
		chartID: chart.chartID,
		scoreID,
		playtype: chart.playtype,
		isPrimary: chart.isPrimary,
	};

	return score;
}
