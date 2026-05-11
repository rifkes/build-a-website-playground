const actionNetworkSelect2Styles = `
/* Select2 container */
.select2-container {
  margin: 0 0 15px;
  position: relative;
  zoom: 1;
  *display: inline;
  vertical-align: middle;
}

.select2-drop-mask {
  display: none !important;
}

/* can_select wrappers */
.select2-container.can_select {
  background: none;
  border: none;
  border-radius: 0;
  padding: 0;
}

select.can_select,
span.can_select {
  line-height: 44px;
  height: 44px;
  border: 1px solid #b3b3b3;
  background: url("/images/select2x2.png") no-repeat right -42px top 10px;
  background-size: 60px 40px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 0;
  padding: 0 30px 0 10px;
  zoom: 1;
  white-space: nowrap;
  display: block;
  margin-bottom: 15px;
  max-width: 100% !important;
  width: 100% !important;
}

.can_select span {
  overflow: hidden;
}

.can_select span.can_selectInner {
  width: 100% !important;
}

select.can_select {
  opacity: 0;
  position: absolute;
  z-index: 999999;
  left: 0;
  top: 0;
}

.select_wrap {
  position: relative;
  height: 33px;
}

/* Select2 choice/button */
.select2-container .select2-choice,
.can_embed_select2 .select2-container .select2-choice {
  display: block;
  padding: 0 0 0 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid #b3b3b3;
  white-space: nowrap;
  color: #444;
  text-decoration: none;
  background-clip: padding-box;
  user-select: none;
  background-image: none;
  height: 44px;
  line-height: 44px;
  border-radius: 0;
  background-color: #fff;
}

.select2-container .select2-choice > .select2-chosen,
.can_embed_select2 .select2-container .select2-choice > .select2-chosen {
  margin-right: 26px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.select2-container .select2-choice abbr,
.can_embed_select2 .select2-container .select2-choice abbr {
  display: none;
  width: 12px;
  height: 12px;
  position: absolute;
  right: 19px;
  top: 15px;
  font-size: 1px;
  text-decoration: none;
  border: 0;
  background: url("https://actionnetwork.org/images/select2.png") right top no-repeat;
  cursor: pointer;
  outline: 0;
}

.select2-container .select2-choice .select2-arrow,
.can_embed_select2 .select2-container .select2-choice .select2-arrow {
  display: inline-block;
  width: 18px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 0;
  background: transparent;
  border: none;
}

.select2-container .select2-choice .select2-arrow b,
.can_embed_select2 .select2-container .select2-choice .select2-arrow b {
  display: block;
  width: 100%;
  height: 100%;
  background: url("https://actionnetwork.org/images/select2.png") no-repeat 0 10px;
}

/* Disabled state */
.select2-container.select2-container-disabled .select2-choice {
  background-color: #f4f4f4;
  background-image: none;
  border: 1px solid #ddd;
  cursor: default;
}

.select2-container.select2-container-disabled .select2-choice .select2-arrow {
  background-color: #f4f4f4;
  background-image: none;
  border-left: 0;
}

.select2-container.select2-container-disabled .select2-choice abbr {
  display: none;
}

/* Drop */
.select2-drop {
  max-width: 100%;
  margin-top: -1px;
  position: absolute;
  z-index: 9999;
  background: #fff;
  color: #000;
  border: 1px solid #aaa;
  border-top: 0;
  border-radius: 0;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
}

.select2-drop.select2-drop-above {
  margin-top: 1px;
  padding-top: 1px;
  border-radius: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

.select2-drop-active {
  border-color: #b3b3b3;
  padding-top: 5px;
  margin-top: -2px;
}

/* Search */
.select2-search {
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  min-height: 26px;
  margin: 0;
  padding-left: 4px;
  padding-right: 4px;
  position: relative;
  z-index: 10000;
  white-space: nowrap;
}

.select2-search input {
  max-width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: auto !important;
  min-height: 26px;
  padding: 4px 20px 4px 5px;
  margin: 0;
  outline: 0;
  font-size: 1em;
  border: 1px solid #aaa;
  border-radius: 0;
  box-shadow: none;
  background: url("https://actionnetwork.org/images/select2.png") no-repeat 100% -22px,
    linear-gradient(to bottom, #fff 85%, #eee 99%);
}

/* Active states */
.select2-container-active .select2-choice,
.select2-container-active .select2-choices {
  border: 1px solid #5897fb;
  outline: none;
  box-shadow: none;
}

.select2-dropdown-open .select2-choice {
  background-color: #fff;
  box-shadow: none;
}

.select2-dropdown-open .select2-choice .select2-arrow {
  background: transparent;
  border-left: none;
  filter: none;
  top: 9px;
}

.select2-dropdown-open .select2-choice .select2-arrow b {
  background-position: -18px 1px;
}

/* Results list */
.select2-results {
  max-height: 200px;
  padding: 0 0 0 4px;
  margin: 4px 4px 4px 0;
  position: relative;
  overflow: hidden auto;
}

.select2-results li {
  list-style: none;
  display: list-item;
  background-image: none;
}

.select2-results .select2-result-label {
  padding: 3px 7px 4px;
  margin: 0;
  cursor: pointer;
  min-height: 1em;
  user-select: none;
  display: inline-block;
}

.select2-results .select2-highlighted {
  background: #3875d7;
  color: #fff;
}

.select2-results .select2-no-results,
.select2-results .select2-searching,
.select2-results .select2-selection-limit {
  background: #f4f4f4;
  display: list-item;
  padding: 3px 5px;
}

.select2-results .select2-disabled {
  background: #f4f4f4;
  display: list-item;
  cursor: default;
}

.select2-results .select2-selected {
  display: none;
}

/* Misc */
.select2-search-choice-close {
  display: block;
  width: 12px;
  height: 13px;
  position: absolute;
  right: 3px;
  top: 4px;
  font-size: 1px;
  outline: none;
  background: url("https://actionnetwork.org/images/select2.png") right top no-repeat;
}

.select2-offscreen,
.select2-offscreen:focus {
  clip: rect(0 0 0 0) !important;
  width: 1px !important;
  height: 1px !important;
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  outline: 0 !important;
  left: 0 !important;
  top: 0 !important;
}

.select2-display-none {
  display: none;
}

/* Retina */
@media only screen and (min-device-pixel-ratio: 1.5),
       only screen and (resolution >= 144dpi) {
  .select2-search input,
  .select2-search-choice-close {
    background-image: url("https://actionnetwork.org/images/select2x2.png");
    background-repeat: no-repeat;
    background-size: 60px 40px;
  }

  .select2-container .select2-choice abbr,
  .select2-container .select2-choice .select2-arrow b {
    background-image: url("https://actionnetwork.org/images/select2x2.png") !important;
    background-repeat: no-repeat !important;
    background-size: 60px 40px !important;
  }

  .select2-search input {
    background-position: 100% -21px !important;
  }
}

/* Error states */
.control-group .select2-container ~ .form_builder_other_input {
  margin-top: -5px;
}

.error_input-select_wrap > .select2-container .select2-choice {
  border: 1px solid #cd3a18;
  color: #333;
  box-shadow: 0 0 0 2px #cd3a18 inset, 0 0 4px 0 #cd3a18 inset;
  transition: all 0.2s linear;
}

.error_input-select_wrap > .select2-container .select2-choice:focus {
  box-shadow: none;
  border: 1px solid #cd3a18;
}

.select2-container {
	width: 100% !important;
}
`;

export default actionNetworkSelect2Styles;