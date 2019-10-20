package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.fandom.FandomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/fandoms")
public class FandomController {
    private final FandomService service;

    public FandomController(FandomService service)  {
        this.service = service;
    }

    @PostMapping(path="/add") // Map ONLY POST Requests
    public Fandom addNewFandom (@RequestBody Fandom newFandom) {
        // @ResponseBody means the returned String is the response, not a view name

        return service.save(newFandom);
    }
//    @GetMapping(path="/join") // Map ONLY GET Requests
//    public @ResponseBody String joinFandom (@RequestParam Long fandomOwnerId) {
//        // @ResponseBody means the returned String is the response, not a view name
//        // @RequestParam means it is a parameter from the GET or POST request
//
//    }
}
