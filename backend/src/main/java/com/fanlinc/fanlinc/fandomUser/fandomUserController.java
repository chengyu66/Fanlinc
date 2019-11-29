package com.fanlinc.fanlinc.fandomUser;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/fandomUsers")
public class fandomUserController {
    private final fandomUserService fuservice;
    private final FandomService fservice;
    private final UserService uservice;

    public fandomUserController(fandomUserService fuservice, FandomService fservice, UserService uservice)  {
        this.fuservice = fuservice;
        this.uservice = uservice;
        this.fservice = fservice;
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/joinFandom") // Map ONLY POST Requests
    @ResponseBody
    public FandomUser createFandomUser (@RequestBody Map<String, String> values) {
        User user = uservice.findByEmail(values.get("email"));
        Fandom fandom = fservice.findByFandomName(values.get("fandomName"));
        String level = values.get("level");
        System.out.println(fandom.getFandomId());
        System.out.println(user.getId());
        FandomUser fu = new FandomUser(user, fandom, level);
        fandom.setFandomUsers(fu);
        user.setFandomUsers (fu);
        return fuservice.save(fu);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/quitFandom") // Map ONLY POST Requests
    @ResponseBody
    public void QuitFandom (@RequestBody Map<String, String> values) {
        String email = values.get("email");
        String fandomName = values.get("fandomName");
        System.out.println(email);
        System.out.println(fandomName);
        User user = uservice.findByEmail(email);
        Fandom fandom = fservice.findByFandomName(fandomName);
        Long fidtoremove = fandom.getFandomId();
        Long uidtoremove = user.getId();
        System.out.println(fidtoremove);
        System.out.println(uidtoremove);
        FandomUser fu = fuservice.findByFandomNameAndEmail(fidtoremove, uidtoremove);
        System.out.println("hello");
        String level = fu.getLevel();
        System.out.println(level);
        Long fuidtoremove = fu.getId();
        System.out.println(fuidtoremove);

        System.out.println("before:");
        for (FandomUser fus: fandom.getFandomUsers()){
            System.out.println(fus.getLevel());
        }
        for (FandomUser fus: fandom.getFandomUsers()){
            if (fus.getId().equals(fuidtoremove)){
                fandom.removeFandomUser(fus);
                break;
            }
        }
        System.out.println("after:");
        for (FandomUser fus: fandom.getFandomUsers()){
            System.out.println(fus.getLevel());
        }

        System.out.println("before:");
        for (FandomUser fus: user.getFandomUsers()){
            System.out.println(fus.getLevel());
        }
        System.out.println(fandom.getFandomUsers());
        for (FandomUser fus: user.getFandomUsers()) {
            if (fus.getId().equals(fuidtoremove)) {
                user.removeFandomUser(fus);
                break;
            }
        }
        System.out.println("after:");
        for (FandomUser fus: user.getFandomUsers()){
            System.out.println(fus.getLevel());
        }

        fuservice.deleteByFandomNameAndEmail(fu);
    }
}
