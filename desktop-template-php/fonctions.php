<?php 
function number_format_short( $n, $precision = 1 ) {
    if ($n < 900) {
        // 0 - 900
        $n_format = number_format($n, $precision);
        $suffix = '';
    } else if ($n < 900000) {
        // 0.9k-850k
        $n_format = number_format($n / 1000, $precision);
        $suffix = 'K';
    } else if ($n < 900000000) {
        // 0.9m-850m
        $n_format = number_format($n / 1000000, $precision);
        $suffix = 'M';
    } else if ($n < 900000000000) {
        // 0.9b-850b
        $n_format = number_format($n / 1000000000, $precision);
        $suffix = 'B';
    } else {
        // 0.9t+
        $n_format = number_format($n / 1000000000000, $precision);
        $suffix = 'T';
    }
  // Remove unecessary zeroes after decimal. "1.0" -> "1"; "1.00" -> "1"
  // Intentionally does not affect partials, eg "1.50" -> "1.50"
    if ( $precision > 0 ) {
        $dotzero = '.' . str_repeat( '0', $precision );
        $n_format = str_replace( $dotzero, '', $n_format );
    }
    return $n_format . $suffix;
}

function shortTimePost($date) {
    $now = new DateTime(); // Heure de maintenant
    $post_date = DateTime::createFromFormat('Y-m-d H:i:s', $date); // Heure avec laquelle j'aimerais comparer $now
    $seconds = $now->format('U') - $post_date->format('U'); // Affichage en secondes

    $origin = new DateTimeImmutable($post_date->format('Y-m-d H:i:s'));
    $target = new DateTimeImmutable($now->format('Y-m-d H:i:s'));
    $interval = $origin->diff($target);

    if ($seconds > 31536000) {
        $shortTime = $interval->format('%ya');
    }
    else if ($seconds > 2678400) {
        $shortTime = $interval->format('%m mois');
    }
    else if ($seconds > 86400) {
        $shortTime = $interval->format('%aj');
    }
    else if ($seconds > 3600) {
        $shortTime = $interval->format('%hh');
    }
    else if ($seconds > 60) {
        $shortTime = $interval->format('%im');
    }
    else {
        $shortTime = (string) $seconds . "s";
    }

    return $shortTime;
}

// echo shortTimePost("2024-10-22 19:34:00");

?>