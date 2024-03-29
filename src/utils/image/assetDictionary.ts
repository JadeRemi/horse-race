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
import HORSE_JUMP_JOCKEY from '../../assets/images/actor/horse_jump_jockey.png';
import HORSE_JOCKEY from '../../assets/images/actor/horse_jockey.png';
import HORSE_RUN from '../../assets/images/actor/horse_run.png';
import HORSE_RUN_JOCKEY from '../../assets/images/actor/horse_run_jockey.png';
import HORSE_SHADOW from '../../assets/images/actor/horse_shadow.png';

import OBSTACLE_JUMP from '../../assets/images/actor/obstacle_jump.png';
import OBSTACLE_FIRE from '../../assets/images/actor/obstacle_fire.png';
import OBSTACLE_LAVA from '../../assets/images/actor/obstacle_lava.png';
import OBSTACLE_MINE from '../../assets/images/actor/obstacle_mine.png';
import OBSTACLE_POISON from '../../assets/images/actor/obstacle_poison_bubble.png';

// [TILES]
import FENCE_WOOD from '../../assets/images/background/fence/fence_wood.png';
import FENCE_METAL from '../../assets/images/background/fence/fence_metal.png';
import BORDER_GRASS_TOP from '../../assets/images/background/fence/border_grass_top.png';
import BORDER_GRASS_BOTTOM from '../../assets/images/background/fence/border_grass_bottom.png';
import BORDER_SAND_TOP from '../../assets/images/background/fence/border_sand_top.png';
import BORDER_SAND_BOTTOM from '../../assets/images/background/fence/border_sand_bottom.png';

import BACK_DUNES from '../../assets/images/background/sky/back_dunes.png';
import BACK_ROCKS from '../../assets/images/background/sky/back_rocks.png';
import BACK_SKY from '../../assets/images/background/sky/back_sky.png';

import TRACKS from '../../assets/images/background/track/tracks.png';
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
		path: HORSE_JUMP,
	},
	HORSE_JUMP_JOCKEY: {
		frames: 15,
		path: HORSE_JUMP_JOCKEY,
	},
	HORSE_RUN: {
		frames: 13,
		path: HORSE_RUN,
	},
	HORSE_RUN_JOCKEY: {
		frames: 13,
		path: HORSE_RUN_JOCKEY,
	},
};

const TILES = {
	FENCE_WOOD: {
		path: FENCE_WOOD,
	},
	FENCE_METAL: {
		path: FENCE_METAL,
	},
	BORDER_GRASS_TOP: {
		path: BORDER_GRASS_TOP,
	},
	BORDER_GRASS_BOTTOM: {
		path: BORDER_GRASS_BOTTOM,
	},
	BORDER_SAND_TOP: {
		path: BORDER_SAND_TOP,
	},
	BORDER_SAND_BOTTOM: {
		path: BORDER_SAND_BOTTOM,
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
	TRACKS: {
		frames: 4,
		path: TRACKS,
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
