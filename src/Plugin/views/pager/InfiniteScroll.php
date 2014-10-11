<?php

/**
 * @file
 * Definition of Drupal\views_infinite_scroll\Plugin\views\pager\InfiniteScroll.
 */

namespace Drupal\views_infinite_scroll\Plugin\views\pager;

use Drupal\views\Plugin\views\pager\SqlBase;

/**
 * Plugin to handle infinite scrolling.
 *
 * @ViewsPager(
 *  id = "infinite_scroll",
 *  title = @Translation("Infinite Scroll"),
 *  short_title = @Translation("Infinite"),
 *  help = @Translation("A views plugin which provides infinte scroll."),
 *  theme = "views_infinite_scroll_pager"
 * )
 */
class InfiniteScroll extends SqlBase {

  /**
   * {@inheritdoc}
   */
  public function summaryTitle() {
    return '';
  }

  /**
   * {@inheritdoc}
   */
  public function render($input) {
    return array(
      '#theme' => $this->themeFunctions(),
    );
  }

}
