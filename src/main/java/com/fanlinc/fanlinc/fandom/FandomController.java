package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/demo")
public class FandomController {
    private FandomRepository fandomRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addNewFandom (@RequestParam String fandomName
            , @RequestParam Long fandomOwnerId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Fandom fandom = new Fandom(fandomName, fandomOwnerId);
        fandom.setFandomName(fandomName);
        fandom.setFandomOwnerId(fandomOwnerId);
        fandomRepository.save(fandom);
        return "Saved";
    }
}
