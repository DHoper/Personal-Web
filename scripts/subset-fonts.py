"""
把 fonts-src/ 裡的字型裁切成只含英數符號的 woff2，輸出到 src/assets/fonts/。
目前只有導覽列用的 Robert Sans（205KB → 約 13KB）。

執行：npm run fonts（需要 pip install fonttools brotli）
"""

import pathlib
import string

from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "fonts"
FONTS = {"RobertSans-Black.ttf": "robert.woff2"}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for src_name, out_name in FONTS.items():
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]
        font = subset.load_font(str(ROOT / "fonts-src" / src_name), options)
        subsetter = subset.Subsetter(options)
        subsetter.populate(text=string.printable + "→←↗✦×—·")
        subsetter.subset(font)
        out_path = OUT / out_name
        subset.save_font(font, str(out_path), options)
        print(f"{src_name} -> {out_name}  {out_path.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
