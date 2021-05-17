/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {isSameDay, isSameMonth} from 'date-fns';

/**
 * `<app-calendar-body>` Custom component to add a calendar body
 *
 * <app-calendar-content>
 *  <app-calendar-body></app-calendar-body>
 *
 * @polymer
 * @litElement
 * @customElement
 */
export class AppCalendarCell extends LitElement {

  /**
   * Static getter styles
   * 
   * @returns {styles}
   */
  static get styles() {
    return css`
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
      
      
      /* Calendar */
    
      .cell {
        position: relative;
        height: 5em;
        // border-right: 1px solid var(--border-color);
        overflow: hidden;
        cursor: pointer;
        background: var(--neutral-color);
        transition: 0.25s ease-out;
      }
      
      .cell:hover {
        background: var(--bg-color);
        transition: 0.5s ease-out;
      }
      
      .selected {
        border-left: 10px solid transparent;
        border-image: linear-gradient(45deg, #1a8fff 0%,#53cbf1 40%);
        border-image-slice: 1;
      }
      
      .cell:last-child {
        border-right: none;
      }
      
      .cell .number {
        position: absolute;
        font-size: 82.5%;
        line-height: 1;
        top: .75em;
        right: .75em;
        font-weight: 700;
      }
      
      .disabled {
        color: var(--text-color-light);
        pointer-events: none;
      }
      
      .cell .bg {
        font-weight: 700;
        line-height: 1;
        color: var(--main-color);
        opacity: 0;
        font-size: 8em;
        position: absolute;
        top: -.2em;
        right: -.05em;
        transition: .25s ease-out;
        letter-spacing: -.07em;
      }
      
      .cell:hover .bg, .selected .bg  {
        opacity: 0.05;
        transition: .5s ease-in;
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
       * holds formatted date in number format
       */
      formattedDate: {type: String},

      /**
       * holds the current date
       */
      selectedDate: {type: Object},

      /**
       * holds the date for the current cell
       */
      day: {type: Object},

      /**
       * holds the start of the current month
       */
      monthStart: {type:Object}
    };
  }

  /**
   * render method
   * 
   * @returns {customElements}
   */
  render() {
    return html`
      <div 
        class="cell ${
        !isSameMonth(this.day, this.monthStart)
          ? "disabled"
          : isSameDay(this.day, this.selectedDate) ? "selected" : ""
        }"
        key=${this.day}>
        <span class="number">${this.formattedDate}</span>
      </div> 
    `;
  }

}

window.customElements.define('app-calendar-cell', AppCalendarCell);
