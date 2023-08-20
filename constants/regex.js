// 01EZTX9M3AWK0ZB16B6KYR56F1

export const HALF_SIZE = /^[ -~]*$/;
export const NUMBER = /^[0-9０-９]*$/;
export const NUMBER_HALFSIZE = /^[0-9.]*$/;
export const NUMBER_FULLSIZE = /^[０-９]*$/;
export const NUMBER_SYMBOLS_HALFSIZE = /^[0-9!-/:-@[-`{-~]*$/;
export const ALPHANUMBERIC = /^[a-zA-Z0-9ａ-ｚＡ-Ｚ０-９\s]*$/;
export const ALPHANUMBERIC_HALFSIZE = /^[a-zA-Z0-9\s]*$/;
export const ALPHANUMBERIC_FULLSIZE = /^[ａ-ｚＡ-Ｚ０-９\s]*$/;

export const KANA = /^[ァ-ヴｧ-ﾝﾞﾟ\s]*$/;
export const KANA_HALFSIZE = /^[ｧ-ﾝﾞﾟ\s]*$/;
export const KANA_FULLSIZE = /^[ァ-ヴ一ー]*$/;
export const KANJI_NUMBER_THREE_CHAR = /^[〇一二三四五六七八九]{3}$/;

export const HIRA_FULLSIZE = /^[ぁ-ん]+$/;

export const KANJI = /^[一-龥\s]*$/;

export const KANJI_KANA_HIRA_MIX =
  /^[ａ-ｚＡ-Ｚ０-９ぁ-んァ-ヴー一-龥々〆〤・’＠\s]*$/; // KANJI_KANA_HIRA FULLSIZE
export const HIRA_KANJI_ALPHA_HALFSIZE_MIX = /^[ぁ-ん一-龥a-zA-Z0-9]+$/; // KANJI-HIRA-HALF ALPHA
export const NUMBER_ZIP_HALFSIZE = /^[0-9]{3}-[0-9]{4}?$/;
export const KANJI_KANA_HIRA_MIX_FOR_PETNAME =
  /^[ａ-ｚＡ-Ｚ０-９ぁ-んァ-ヴー一-龥々〆〤・’＠　]*?$/; // KANJI_KANA_HIRA FULLSIZE pet名の正規表現で文字と文字の間の半角スペースを許容しない。文字と文字の間の全角スペースは許容
