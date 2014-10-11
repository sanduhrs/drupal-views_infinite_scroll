<?php

/**
 * @file
 * Definition of Drupal\views_infinite_scroll\Plugin\views\pager\InfiniteScroll.
 */

namespace Drupal\views_infinite_scroll\Plugin\views\pager;

use Drupal\views\Plugin\views\pager\SqlBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Component\Utility\Html;

/**
 * Plugin to handle infinite scrolling.
 *
 * @ingroup views_pager_plugins
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
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['vis'] = array(
      'contains' => array(
        'manual_load' => array(
          'default' => FALSE,
        ),
        'manual_load_text' => array(
          'default' => $this->t('Load More'),
        ),
      ),
    );
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);
    $form['vis'] = array(
      '#title' => $this->t('Infinite Scroll Options'),
      '#type' => 'details',
      '#open' => TRUE,
      '#tree' => TRUE,
      '#input' => TRUE,
      '#weight' => -100,
      'manual_load' => array(
        '#type' => 'checkbox',
        '#title' => $this->t('Load Manually'),
        '#description' => $this->t('Users must manually click a button to load more results.'),
        '#default_value' => $this->options['vis']['manual_load'],
      ),
      'manual_load_text' => array(
        '#type' => 'textfield',
        '#title' => $this->t('Load More Text'),
        '#description' => $this->t('The text inside the manually load button.'),
        '#default_value' => $this->options['vis']['manual_load_text'],
        '#states' => array(
          'visible' => array(
            ':input[name="pager_options[vis][manual_load]"]' => array('checked' => TRUE),
          ),
        ),
      ),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function summaryTitle() {
    return $this->t('settings');
  }

  /**
   * {@inheritdoc}
   */
  public function render($input) {
    $tags = array(
      1 => $this->options['tags']['previous'],
      3 => $this->options['tags']['next'],
    );

    return array(
      '#theme' => $this->themeFunctions(),
      '#options' => $this->options,
      '#attached' => array(
        'js' => array($this->buildJsSettings()),
        'library' => array('views_infinite_scroll/views-infinite-scroll'),
      ),
      '#tags' => $tags,
      '#element' => $this->options['id'],
      '#parameters' => $input,
    );
  }

  /**
   * Send javascript variables.
   *
   * @return array
   *   An array of variables to be sent to the browser.
   */
  protected function buildJsSettings() {
    // Compiled from template_preprocess_views_view().
    $class = '.view-' . Html::cleanCssIdentifier($this->view->storage->id) . '.view-id-' . $this->view->storage->id . '.view-display-id-' . $this->view->current_display;
    return array(
      'type' => 'setting',
      'data' => array(
        'views_infinite_scroll' => array(
          // An array keyed by the view's unique selector.
          '.view-dom-id-' . $this->view->dom_id => array(
            'options' => $this->options['vis'],
            // A class which will represent this view on subsequent requests.
            'view_class' => $class,
          ),
        ),
      ),
    );
  }
}
