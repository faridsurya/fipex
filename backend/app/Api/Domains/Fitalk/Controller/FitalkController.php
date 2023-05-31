<?php

namespace App\Api\Domains\Fitalk\Controller;

use App\Api\Domains\Fitalk\Model\Fitalk;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class FitalkController extends ResourceController
{
    public function __construct() {
    }
    
    public function store()
    {
        $m = new Fitalk();
        try {
            $rq = $this->request->getJSON(true);
            $q = $m->insert($rq);
            return $this->respond(['messsage' => 'insert partisipant created successfully'], 201);
        } catch (Exception $th) {
            return $this->respond($th->getMessage(), 400);
        } catch (\Throwable $th) {
            return $this->respond($th->getMessage(), 400);
        }
    }

    public function list()
    {
        $m = new Fitalk();
        try {
            return $this->respond($m->list(), 200);
        } catch (\Throwable $th) {
            return $this->respond($th->getMessage(), 400);

        }
    }


    public function setStatus($id)
    {
        $m = new Fitalk();
        $rq = $this->request->getJSON(true);
        try {
            $res = $m->setStatus($id, $rq);
            return $this->respond($res, 200);
        } catch (\Throwable $th) {
            return $this->respond($th->getMessage(), 400);
        }
    }
    
    
    public function isExists($email)
    {
        $m = new Fitalk();
        // $email = $this->request->getJSON(true)['email'];
        try {
            $r = $m->select('id')->getWhere(['email' => $email])->getResult();
            if (!$r) {
                return $this->respond(['message' => 'partisipant not found'], 404);
            }
            return $this->respond($r[0], 200);
        } catch (\Throwable $th) {
            return $this->respond($th->getMessage(), 400);
        }
    }



}