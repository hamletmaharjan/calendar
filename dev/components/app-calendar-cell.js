/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css, nothing} from 'lit';
import {isSameDay, isSameMonth} from 'date-fns';

import './app-menu';

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
        height: 5.5em;
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
        background: var(--bg-color);
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
      .top {
        height:35%;
        // background:red;
      }
      .bottom {
        font-size:12px;
        position:relative;
      }
      .event {
        background:#039dfc;
        color:white;
        width:90%;
        margin:0 auto;
        padding:0px 10px;
        border-radius:5px;
        margin-bottom:2px;
      }
      .more {
        text-align:center;
      }
      app-menu {
        position: absolute;
        top:5px;
        z-index:4;
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
      monthStart: {type:Object},

      events: {type:Array},

      showAppMenu: {type: Boolean},

      onMoreMenuClick: {type: Function},

      hasMore: {type: Boolean}
    };
  }

  constructor() {
    super();

    this.hasMore = false;
    this.showAppMenu = false;

    this.handleCancel = this.handleCancel.bind(this);
  }

  handleMoreClick(e) {
    let filteredEvents = this.events.filter(eventItem => {
      return isSameDay(new Date(eventItem.start), this.day);
    });
    // filteredEvents.splice(0,2);
    this.onMoreMenuClick(e, filteredEvents, this.day);
  }

  renderEventsTemplate() {
    let allEvents = [];
    let count = 0;
    this.events.forEach(item => {
      if(isSameDay(new Date(item.start), this.day)){
        if(count<2){
          allEvents.push(
            html`
              <div class="event" draggable="true">
                <span>${item.title.substring(0,12)}</span>
              </div>
            `
          )
        }
        count++;
      }
    });

    if(count>2){
      this.hasMore = true;
      allEvents.push(
        html`
          <div class="more">
            <span @click="${this.handleMoreClick}">+ ${count-2} more</span>
          </div>
        `
      )
    }

    return allEvents;
  }

  handleMore() {
    this.showAppMenu = true;
  }

  renderMoreTemplate() {
    let filteredEvents = this.events.filter(eventItem => {
      return isSameDay(new Date(eventItem.start), this.day);
    });
    // filteredEvents.splice(0,2);
    console.log(filteredEvents);
    return html`<app-menu .items="${filteredEvents}" .onCancel="${this.handleCancel}" .day="${this.day}"></app-menu>`
  }

  handleCancel() {
    this.showAppMenu = false;
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
        <div class="top">
          <span class="number">${this.formattedDate}</span>
        </div>
        <div class="bottom">
          ${this.renderEventsTemplate()}
        </div>
        ${this.hasMore && this.showAppMenu ? this.renderMoreTemplate(): nothing}
      </div> 
    `;
  }

}

window.customElements.define('app-calendar-cell', AppCalendarCell);
