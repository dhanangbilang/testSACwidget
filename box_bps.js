(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Mau setting apa ?</legend>
				<table>
					<tr>
						<td>Mau warna apa ?</td>
						<td><input id="bps_color" type="text" size="10" maxlength="10"></td>
					</tr>
					<tr>
						<td>Mau value berapa ?</td>
						<td><input id="bps_value" type="text" size="10" maxlength="10"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class BoxBps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color
							value: this.value
						}
					}
			}));
		}

		set color(newColor) {
			this._shadowRoot.getElementById("bps_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("bps_color").value;
		}

		set value(newValue) {
			this._shadowRoot.getElementById("bps_value").value = newColor;
		}

		get value() {
			return this._shadowRoot.getElementById("bps_value").value;
		}
	}

	customElements.define("com-demo-box-bps", BoxBps);
})();