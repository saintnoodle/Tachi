import { FormatTime, MillisToSince } from "util/time";
import React from "react";
import { integer } from "tachi-common";

export default function TimestampCell({
	time,
	service,
}: {
	time: integer | null;
	service?: string | null;
}) {
	return (
		<td style={{ minWidth: "140px", maxWidth: "200px" }}>
			{time ? (
				<>
					{MillisToSince(time)}

					<br />
					<small className="text-body-secondary">{FormatTime(time)}</small>
				</>
			) : (
				"No Data."
			)}
			{service && (
				<>
					<br />
					<small className="text-body-secondary">Played On: {service}</small>
				</>
			)}
		</td>
	);
}
