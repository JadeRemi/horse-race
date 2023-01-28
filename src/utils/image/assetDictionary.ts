// [ACTORS]
import BUBBLE_SHADOW from '../../assets/images/actor/bubble_shadow.png';
import EXPLOSION from '../../assets/images/actor/explosion.png';
import FIRE_THIN from '../../assets/images/actor/fire_1.png';
import FIRE_WIDE from '../../assets/images/actor/fire_2.png';
import FIRE_BLOB from '../../assets/images/actor/fire_blob.png';
import FIRE_CLOUD from '../../assets/images/actor/fire_blobs.png';
import FIRE_POISON_THIN from '../../assets/images/actor/fire_poison_1.png';
import FIRE_POISON_WIDE from '../../assets/images/actor/fire_poison_2.png';
import POISON_BLOB from '../../assets/images/actor/poison_blob.png';
import POISON_CLOUD from '../../assets/images/actor/poison_blobs.png';
import POISON_POP from '../../assets/images/actor/poison_bubble_pop.png';

import HORSE_OUTLINE_JOCKEY from '../../assets/images/actor/horse_1.png';
import HORSE_OUTLINE from '../../assets/images/actor/horse_2.png';
import HORSE from '../../assets/images/actor/horse_3.png';
import JOCKEY from '../../assets/images/actor/jockey.png';
import HORSE_JUMP from '../../assets/images/actor/horse_jump.png';
import HORSE_JOCKEY from '../../assets/images/actor/horse_jockey.png';
import HORSE_RUN from '../../assets/images/actor/horse_run.png';
import HORSE_SHADOW from '../../assets/images/actor/horse_shadow.png';

import OBSTACLE_JUMP from '../../assets/images/actor/obstacle_jump.png';
import OBSTACLE_FIRE from '../../assets/images/actor/obstacle_fire.png';
import OBSTACLE_LAVA from '../../assets/images/actor/obstacle_lava.png';
import OBSTACLE_MINE from '../../assets/images/actor/obstacle_mine.png';
import OBSTACLE_POISON from '../../assets/images/actor/obstacle_poison_bubble.png';

// [TILES]
import FENCE_DIRT_TOP from '../../assets/images/background/fence/fence_dirt_1.png';
import FENCE_DIRT_BOTTOM from '../../assets/images/background/fence/fence_dirt_2.png';
import FENCE_GRASS_TOP from '../../assets/images/background/fence/fence_grass_1.png';
import FENCE_GRASS_BOTTOM from '../../assets/images/background/fence/fence_grass_2.png';
import BORDER_GRASS from '../../assets/images/background/fence/fence_grass.png';
import BORDER_SAND from '../../assets/images/background/fence/fence_sand.png';

import BACK_DUNES from '../../assets/images/background/sky/back_dunes.png';
import BACK_ROCKS from '../../assets/images/background/sky/back_rocks.png';
import BACK_SKY from '../../assets/images/background/sky/back_sky.png';

import TRACK_DIRT from '../../assets/images/background/track/track_dirt.png';
import TRACK_GRASS from '../../assets/images/background/track/track_grass.png';
import TRACK_SAND from '../../assets/images/background/track/track_sand.png';
import TRACK_SYNTH from '../../assets/images/background/track/track_synth.png';

import PFP_EXAMPLE from '../../assets/images/gui/pfp_example.png';
import UI_BANNER from '../../assets/images/gui/ui_banner.png';

import LOADER from '../../assets/images/gui/loader_horseshoe.png';
import SEAMLESS_ROW from '../../assets/images/background/seamless/tileable_1.png';
import SEAMLESS_COLUMN from '../../assets/images/background/seamless/tileable_2.png';

const ACTORS = {
	HORSE: {
		frames: 9,
		path: HORSE,
	},
	HORSE_OUTLINE: {
		frames: 9,
		path: HORSE_OUTLINE,
	},
	HORSE_OUTLINE_JOCKEY: {
		frames: 9,
		path: HORSE_OUTLINE_JOCKEY,
	},
	JOCKEY: {
		frames: 9,
		path: JOCKEY,
	},
	HORSE_JOCKEY: {
		frames: 9,
		path: HORSE_JOCKEY,
	},
	HORSE_SHADOW: {
		frames: 9,
		path: HORSE_SHADOW,
	},
	EXPLOSION: {
		frames: 9,
		path: EXPLOSION,
	},
	BUBBLE_SHADOW: {
		frames: 1,
		path: BUBBLE_SHADOW,
	},
	FIRE_THIN: {
		frames: 9,
		path: FIRE_THIN,
	},
	FIRE_WIDE: {
		frames: 9,
		path: FIRE_WIDE,
	},
	FIRE_BLOB: {
		frames: 7,
		path: FIRE_BLOB,
	},
	FIRE_CLOUD: {
		frames: 9,
		path: FIRE_CLOUD,
	},
	FIRE_POISON_THIN: {
		frames: 9,
		path: FIRE_POISON_THIN,
	},
	FIRE_POISON_WIDE: {
		frames: 9,
		path: FIRE_POISON_WIDE,
	},
	POISON_BLOB: {
		frames: 9,
		path: POISON_BLOB,
	},
	POISON_CLOUD: {
		frames: 9,
		path: POISON_CLOUD,
	},
	POISON_POP: {
		frames: 10,
		path: POISON_POP,
	},

	OBSTACLE_JUMP: {
		frames: 2,
		path: OBSTACLE_JUMP,
	},
	OBSTACLE_FIRE: {
		frames: 9,
		path: OBSTACLE_FIRE,
	},
	OBSTACLE_LAVA: {
		frames: 1,
		path: OBSTACLE_LAVA,
	},
	OBSTACLE_MINE: {
		frames: 2,
		path: OBSTACLE_MINE,
	},
	OBSTACLE_POISON: {
		frames: 1,
		path: OBSTACLE_POISON,
	},
	// multi-actor atlas
	HORSE_JUMP: {
		frames: 15,
		rows: 5,
		path: HORSE_JUMP,
	},
	HORSE_RUN: {
		frames: 9,
		rows: 5,
		path: HORSE_RUN,
	},
};

const TILES = {
	FENCE_DIRT_TOP: {
		path: FENCE_DIRT_TOP,
	},
	FENCE_DIRT_BOTTOM: {
		path: FENCE_DIRT_BOTTOM,
	},
	FENCE_GRASS_TOP: {
		path: FENCE_GRASS_TOP,
	},
	FENCE_GRASS_BOTTOM: {
		path: FENCE_GRASS_BOTTOM,
	},
	BORDER_GRASS: {
		path: BORDER_GRASS,
	},
	BORDER_SAND: {
		path: BORDER_SAND,
	},
	BACK_DUNES: {
		path: BACK_DUNES,
	},
	BACK_ROCKS: {
		path: BACK_ROCKS,
	},
	BACK_SKY: {
		path: BACK_SKY,
	},
	TRACK_DIRT: {
		path: TRACK_DIRT,
	},
	TRACK_GRASS: {
		path: TRACK_GRASS,
	},
	TRACK_SAND: {
		path: TRACK_SAND,
	},
	TRACK_SYNTH: {
		path: TRACK_SYNTH,
	},
	PFP_EXAMPLE: {
		path: PFP_EXAMPLE,
	},
	UI_BANNER: {
		path: UI_BANNER,
	},
	LOADER: {
		path: LOADER,
	},
	SEAMLESS_ROW: {
		path: SEAMLESS_ROW,
	},
	SEAMLESS_COLUMN: {
		path: SEAMLESS_COLUMN,
	},
};

export default {
	ACTORS,
	TILES,
};
