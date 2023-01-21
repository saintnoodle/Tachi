import type {
	APIImportTypes,
	FileUploadImportTypes,
	IRImportTypes,
	ImportTypes,
} from "../types/import-types";

// silly hack to enforce that we *definitely* define all these things.
const FILE_IMPORT_TYPES: Record<FileUploadImportTypes, true> = {
	"file/eamusement-iidx-csv": true,
	"file/eamusement-sdvx-csv": true,
	"file/batch-manual": true,
	"file/solid-state-squad": true,
	"file/mer-iidx": true,
	"file/pli-iidx-csv": true,
	"file/mypagescraper-records-csv": true,
	"file/mypagescraper-player-csv": true,
};

const IR_IMPORT_TYPES: Record<IRImportTypes, true> = {
	"ir/direct-manual": true,
	"ir/barbatos": true,
	"ir/fervidex": true,
	"ir/fervidex-static": true,
	"ir/beatoraja": true,
	"ir/usc": true,
	"ir/kshook-sv6c": true,
	"ir/kshook-sv6c-static": true,
	"ir/lr2hook": true,
};

const API_IMPORT_TYPES: Record<APIImportTypes, true> = {
	"api/eag-iidx": true,
	"api/eag-sdvx": true,
	"api/flo-iidx": true,
	"api/flo-sdvx": true,
	"api/min-sdvx": true,
	"api/cg-dev-museca": true,
	"api/cg-dev-popn": true,
	"api/cg-dev-sdvx": true,
	"api/cg-prod-museca": true,
	"api/cg-prod-popn": true,
	"api/cg-prod-sdvx": true,
};

export const fileImportTypes: Array<FileUploadImportTypes> = Object.keys(
	FILE_IMPORT_TYPES
) as Array<FileUploadImportTypes>;

export const irImportTypes: Array<IRImportTypes> = Object.keys(
	IR_IMPORT_TYPES
) as Array<IRImportTypes>;

export const apiImportTypes: Array<APIImportTypes> = Object.keys(
	API_IMPORT_TYPES
) as Array<APIImportTypes>;

export const allImportTypes: Array<ImportTypes> = [
	...fileImportTypes,
	...irImportTypes,
	...apiImportTypes,
];