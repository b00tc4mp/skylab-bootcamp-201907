import React from 'react'
import { withRouter } from 'react-router-dom'

function Week({ history }) {

    function handleMonth(event) {
        event.preventDefault()

        history.push('/month')
    }

    function handleWeek(event) {
        event.preventDefault()

        history.push('/week')
    }

    function handleDay(event) {
        event.preventDefault()

        history.push('/day')
    }

    return <>
    
    <main class="main"> 

        <div class="week">

            <h1 class="week__title"><i class="fas fa-caret-left"></i> Week 1 <i class="fas fa-caret-right"></i></h1>
            <p class="week__month-year">September 2019</p>

            <div class="week__toolbar">
                <div class="week__toggle">
                  <div class="month__toggle-option" onClick={handleDay}>today</div>
                  <div class="month__toggle-option month__toggle-option--selected" onClick={handleWeek}>week</div>
                  <div class="month__toggle-option" onClick={handleMonth}>month</div>
                </div>
                <form>
                  <input class="week__search-input" type="text" placeholder="Search"/> <i class="fa fa-search"></i>
                </form>
            </div>

            <div class="week__act">
              <div class="week__activity">
                      <div class="week__chores">
                          <p class="week__list-title"><strong>Regular chores</strong></p>
                          <ul class="week__list">
                              <li class="week__item"><i class="far fa-square"></i> cleaning</li>
                              <li class="week__item"><i class="far fa-square"></i> listing stock</li>
                              <li class="week__item"><i class="far fa-square"></i> re-stocking</li>
                              <li class="week__item"><i class="far fa-plus-square"></i></li>
                          </ul>
                      </div>
                      <div class="week__tags">
                          <p class="week__list-title"><strong>Activity Tags</strong></p>
                          <ul class="week__list">
                              <li class="week__item"><i class="fas fa-square"></i> cooking</li>
                              <li class="week__item"><i class="fas fa-square"></i> eating</li>
                              <li class="week__item"><i class="fas fa-plus-square"></i></li>
                          </ul>
                      </div>
              </div>
              
              <div class="weekly">
                <div class="weekly__header">
                  <div>mon</div>
                  <div>tue</div>
                  <div>wed</div>
                  <div>thu</div>
                  <div>fri</div>
                  <div>sat</div>
                  <div>sun</div>
                </div>
                <div class="weekly__week">
                  <div class="weekly__day day">1</div>
                  <div class="weekly__day day">2</div>
                  <div class="weekly__day day">3</div>
                  <div class="weekly__day day">4</div>
                  <div class="weekly__day day">5</div>
                  <div class="weekly__day day">6</div>
                  <div class="weekly__day day">7</div>
                </div>
              </div>
            </div>

        </div>

    </main>
    </>
}

export default withRouter(Week)