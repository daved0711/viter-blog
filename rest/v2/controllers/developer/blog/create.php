<?php
$conn = null;
$conn = checkDbConnection();
$blog = new Blog($conn);

if (array_key_exists("blogid", $_GET)) {
    checkEndpoint();
} 

checkPayload($data);

$blog->blog_title = checkIndex($data, "blog_title");
$blog->blog_category = checkIndex($data, "blog_category");
$blog->blog_level = checkIndex($data, "blog_level");
$blog->blog_serving = checkIndex($data, "blog_serving");
$blog->blog_prep_time = checkIndex($data, "blog_prep_time");
$blog->blog_image = checkIndex($data, "blog_image");
$blog->blog_ingredients = json_encode($data["blog_ingredients"]);
$blog->blog_description = checkIndex($data, "blog_description");
$blog->blog_instruction = checkIndex($data, "blog_instruction");

$blog->blog_is_active = 1;
$blog->blog_created = date("Y-m-d H:i:s");
$blog->blog_datetime = date("Y-m-d H:i:s");

// isNameExist($blog, $blog->blog_title);

$query = checkCreate($blog);
returnSuccess($blog, "blog", $query);