<?php
class Blog
{
    public $blog_aid;
    public $blog_title;
    public $blog_category;
    public $blog_level;
    public $blog_serving;
    public $blog_prep_time;
    public $blog_image;
    public $blog_ingredients;
    public $blog_description;
    public $blog_instruction;
    public $blog_is_active;
    public $blog_datetime;
    public $blog_created;

    public $connection;
    public $lastInsertedId;

    public $tblblog;

    public $blog_start;
    public $blog_total;
    public $blog_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblblog = "blog";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblblog} ";
            $sql .= "( blog_title, ";
            $sql .= "blog_is_active, ";
            $sql .= "blog_category, ";
            $sql .= "blog_level, ";
            $sql .= "blog_serving, ";
            $sql .= "blog_prep_time, ";
            $sql .= "blog_image, ";
            $sql .= "blog_ingredients, ";
            $sql .= "blog_description, ";
            $sql .= "blog_instruction, ";
            $sql .= "blog_datetime, ";
            $sql .= "blog_created ) values ( ";
            $sql .= ":blog_title, ";
            $sql .= ":blog_is_active, ";
            $sql .= ":blog_category, ";
            $sql .= ":blog_level, ";
            $sql .= ":blog_serving, ";
            $sql .= ":blog_prep_time, ";
            $sql .= ":blog_image, ";
            $sql .= ":blog_ingredients, ";
            $sql .= ":blog_description, ";
            $sql .= ":blog_instruction, ";
            $sql .= ":blog_datetime, ";
            $sql .= ":blog_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_title" => $this->blog_title,
                "blog_is_active" => $this->blog_is_active,
                "blog_category" => $this->blog_category,
                "blog_level" => $this->blog_level,
                "blog_serving" => $this->blog_serving,
                "blog_prep_time" => $this->blog_prep_time,
                "blog_image" => $this->blog_image,
                "blog_ingredients" => $this->blog_ingredients,
                "blog_description" => $this->blog_description,
                "blog_instruction" => $this->blog_instruction,
                "blog_datetime" => $this->blog_datetime,
                "blog_created" => $this->blog_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblblog} ";
            $sql .= "order by blog_is_active desc, ";
            $sql .= "blog_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblblog} ";
            $sql .= "order by blog_is_active desc, ";
            $sql .= "blog_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->blog_start - 1,
                "total" => $this->blog_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblblog} ";
            $sql .= "where blog_title like :blog_title ";
            $sql .= "order by blog_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_title" => "%{$this->blog_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblblog} ";
            $sql .= "where blog_aid  = :blog_aid ";
            $sql .= "order by blog_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_aid" => $this->blog_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

   // update
   public function update()
   {
       try {
           $sql = "update {$this->tblblog} set ";
           $sql .= "blog_title = :blog_title, ";
           $sql .= "blog_category = :blog_category, ";
           $sql .= "blog_level = :blog_level, ";
           $sql .= "blog_serving = :blog_serving, ";
           $sql .= "blog_prep_time = :blog_prep_time, ";
           $sql .= "blog_image = :blog_image, ";
           $sql .= "blog_ingredients = :blog_ingredients, ";
           $sql .= "blog_description = :blog_description, ";
           $sql .= "blog_instruction = :blog_instruction, ";
           $sql .= "blog_datetime = :blog_datetime ";
           $sql .= "where blog_aid = :blog_aid ";
           $query = $this->connection->prepare($sql);
           $query->execute([
               "blog_title" => $this->blog_title,
               "blog_category" => $this->blog_category,
               "blog_level" => $this->blog_level,
               "blog_serving" => $this->blog_serving,
               "blog_prep_time" => $this->blog_prep_time,
               "blog_image" => $this->blog_image,
               "blog_ingredients" => $this->blog_ingredients,
               "blog_description" => $this->blog_description,
               "blog_instruction" => $this->blog_instruction,
               "blog_datetime" => $this->blog_datetime,
               "blog_aid" => $this->blog_aid,
           ]);
       } catch (PDOException $ex) {
           $query = false;
       }
       return $query;
   }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblblog} set ";
            $sql .= "blog_is_active = :blog_is_active, ";
            $sql .= "blog_datetime = :blog_datetime ";
            $sql .= "where blog_aid = :blog_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_is_active" => $this->blog_is_active,
                "blog_datetime" => $this->blog_datetime,
                "blog_aid" => $this->blog_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblblog} ";
            $sql .= "where blog_aid = :blog_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_aid" => $this->blog_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select blog_title from {$this->tblblog} ";
            $sql .= "where blog_title = :blog_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_title" => "{$this->blog_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // // name
    // public function checkAssociation()
    // {
    //     try {
    //         $sql = "select product_blog_id from {$this->tblblog} ";
    //         $sql .= "where product_blog_id = :product_blog_id ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "product_blog_id" => $this->blog_aid,
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }


    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblblog} ";
            $sql .= "where blog_is_active = :blog_is_active  ";
            $sql .= "order by blog_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_is_active" => $this->blog_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblblog} ";
            $sql .= "where ";
            $sql .= "blog_is_active = :blog_is_active ";
            $sql .= "and blog_title like :blog_title ";
            $sql .= "order by blog_is_active desc, ";
            $sql .= "blog_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "blog_title" => "%{$this->blog_search}%",
                "blog_is_active" => $this->blog_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}