<?php

/**
 * @file
 * A drush helper command to download the autopager library.
 */

/**
 * Implements hook_drush_command().
 */
function views_infinite_scroll_drush_command() {
  return array(
    'dl-autopager' => array(
      'description' => 'Download jQuery autopager',
      'bootstrap' => DRUSH_BOOTSTRAP_DRUPAL_FULL,
    ),
  );
}

/**
 * Download autopager and place it in the correct place.
 */
function drush_views_infinite_scroll_dl_autopager() {
  $library = views_infinite_scroll_autopager_library();
  $source_file = $library['remote'];
  $destination_file = $library['js'][0]['data'];

  // Check if if the file already exists.
  if (file_exists($destination_file)) {
    drush_print(t('The autopager library has already been downloaded.'));
    return;
  }

  // Make sure we can write to the destination.
  $dest_folder = drupal_dirname($destination_file);
  $is_writeable = file_prepare_directory($dest_folder, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS);
  if (!$is_writeable) {
    drush_print(t('Could not write to @folder_name.', array('@folder_name' => $dest_folder)));
    return;
  }

  // Download the file.
  drush_print(t('Downloading library from: @url', array('@url' => $source_file)));
  $downloaded_file = file_get_contents($source_file);
  if (!$downloaded_file) {
    drush_print(t('Failed to download library.'));
    return;
  }

  $success = file_put_contents($destination_file, $downloaded_file);
  if ($success) {
    drush_print(t('Views infinite scroll is now ready to use.'));
  }
}
