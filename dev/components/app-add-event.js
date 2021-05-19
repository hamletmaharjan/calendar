/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

//  import {format} from 'date-fns';
import {LitElement, html, css, render} from 'lit';
import {format, formatISO} from 'date-fns';

import '@vaadin/vaadin-dialog';

/**
* `<app-add-event>` Custom component to add a new event to the calendar
*
* <app-calendar>
*  <app-add-event></app-add-event>
*
* @polymer
* @litElement
* @customElement
*/
export class AppAddEvent extends LitElement {

  /**
  * Static getter styles
  * 
  * @returns {styles}
  */
  static get styles() {
    return css`
      .icon {
        font-family: 'Material Icons', serif;
        font-style: normal;
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
      
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'liga';
      } 

      /* GENERAL */
      
      * {
        box-sizing: border-box;
      }
      
      :host {
          font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
          font-size: 1em;
          font-weight: 300;
          line-height: 1.5;
          color: var(--text-color);
          background: var(--bg-color);
          position: relative;
      }
      
      
    `;
  }

  /**
  * Static getter properties
  * 
  * @returns Object
  */
  static get properties() {
    return {
      /**
      * holds the format of the date
      */
      dateFormat: {type: String},

      title: {type: String},
      startDate: {type: String},

      showDialog: {type: Boolean},
      onSubmitData: {type: Function},
      day: {type: Object}

    };
  }

  /**
  * constructor
  */
  constructor() {
    super();

    this.showDialog = false;
    this.dateFormat = "MMMM yyyy";

    this.dialogRenderer = this.dialogRenderer.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  firstUpdated() {
    this.dialog = this.shadowRoot.querySelector('vaadin-dialog');
    console.log(this.dialog);
  }

  showAddEvent() {
    this.showDialog = true;
    // this.dialog.opened = true;
  }

  hideAddEvent() {
    this.showDialog = false;
  }
  /**
  * render method
  * 
  * @returns {customElements}
  */
  render() {
    console.log('render modal')
    return html`
      <vaadin-dialog
        no-close-on-esc no-close-on-outside-click
        .opened="${this.showDialog}"
        .renderer="${this.dialogRenderer}">
      </vaadin-dialog>
    `;
  }

  dialogRenderer(root, dialog) {
    // console.log(this);
    const innerHTML = html`
      <h2>Create and Event</h2>
      <p>${format(this.day, 'MMM d')}</p>
      <div>
        <label>Event Title</label><br>
        <input type="text" @input="${this.handleInputChange}" name="title"><br>
        <label>Time</label><br>
        <input type="time" @input="${this.handleInputChange}" name="startDate"> - <input type="time" @input="${this.handleInputChange}"> <br>
        <button type="button" @click="${this.handleAdd}">add</button>
        <button type="button" @click="${this.handleCancel}">cancel</button>
      </div>
    `;
    render(innerHTML, root);
    // console.log('here',root, dialog);
  }  

  handleInputChange(e) {
    // console.log(typeof(e.target.value));
    let name = e.target.name;
    let val = e.target.value;
    this[name] = val;
  }

  handleAdd() {
    // console.log(formatISO(this.day))

    this.onSubmitData({title:this.title, start: formatISO(this.day)})
  }
  handleCancel() {
    // console.log(this);
    console.log('handlcla')
    this.showDialog = false;
    // this.requestUpdate();
    // this.dialog.opened = false;
  }

}

window.customElements.define('app-add-event', AppAddEvent);
