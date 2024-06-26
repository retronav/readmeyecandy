import satori from "satori";
import fs from "fs/promises";
import { html } from "satori-html";

export const readmeImage = async (visitors: number, codingStats: string) =>
	await satori(
		html`<div
			style="background-color: #1D0A25; font-size: 20px; color: transparent; font-family: 'Press Start 2P'; display: flex; flex-direction: column; padding: 16px;"
		>
			<p
				style="margin: 0; line-height: 40px; background: linear-gradient(0deg, rgba(244,33,126,1) 50%, rgba(251,132,82,1) 50%, rgba(251,132,82,1) 66%, rgba(251,211,82,1) 66%, rgba(251,211,82,1) 100%); background-clip: text;"
			>
				Visitors: ${visitors}
			</p>
			<p
				style="margin: 0; line-height: 40px; background: linear-gradient(0deg, rgba(244,33,126,1) 50%, rgba(251,132,82,1) 50%, rgba(251,132,82,1) 66%, rgba(251,211,82,1) 66%, rgba(251,211,82,1) 100%); background-clip: text;"
			>
				Time spent in the editor this week: ${codingStats}
			</p>
		</div>`,
		{
			height: 100,
			width: 1440,
			fonts: [
				{
					name: "Press Start 2P",
					data: await fs.readFile("fonts/PressStart2P-Regular.ttf"),
				},
				{
					name: "Alumni Sans",
					data: await fs.readFile("fonts/AlumniSansCollegiateOne-Regular.ttf"),
				},
			],
		}
	);
