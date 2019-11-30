package com.fanlinc.fanlinc.fandomUser;

import com.fanlinc.fanlinc.exceptions.FandomExistsException;
import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
    @PostMapping(path="/createFandom") // Map ONLY POST Requests
    public Fandom createNewFandom (@RequestBody Map<String, String> values) throws FandomExistsException {
        String email = values.get("email");
        String fandomName = values.get("fandomName");
        String level = "Owner";
        if (fservice.findByFandomName(fandomName) != null) {
            throw new FandomExistsException(fandomName);
        }
        //find the user
        User user = uservice.findByEmail(email);
        // create the new fandom
        Fandom fandom = new Fandom(fandomName,email);
        FandomUser fu = new FandomUser(user, fandom, level);
        fandom.setFandomUsers(fu);
        user.setFandomUsers (fu);

        fuservice.save(fu);
        return fandom;
//        HashMap<String, Object> res = new HashMap<>();
//        res.put("id", fandom.getFandomId());
//        res.put("fandomName", fandomName);
//        return res;
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/joinFandom") // Map ONLY POST Requests
    @ResponseBody
    public Fandom createFandomUser (@RequestBody Map<String, String> values) {
        User user = uservice.findByEmail(values.get("email"));
        Fandom fandom = fservice.findByFandomName(values.get("fandomName"));
        String level = values.get("level");
        System.out.println(fandom.getFandomId());
        System.out.println(user.getId());
        FandomUser fu = new FandomUser(user, fandom, level);
        fandom.setFandomUsers(fu);
        user.setFandomUsers (fu);
        fuservice.save(fu);
        return fandom;
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path="/getLevel") // Map ONLY POST Requests
    public FandomUser getLevel (@RequestParam Long uid, @RequestParam Long fid) {
        FandomUser fu = fuservice.findByFidAndUid(fid, uid);
        return fuservice.save(fu);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/setLevel") // Map ONLY POST Requests
    public FandomUser setLevel (@RequestBody Map<String, String> values) {
        Long fid = Long.parseLong(values.get("fid"));
        Long uid = Long.parseLong(values.get("uid"));
        String level = values.get("level");
        System.out.println(level);
        FandomUser fu = fuservice.findByFidAndUid(fid, uid);
        fu.setLevel(level);
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
        FandomUser fu = fuservice.findByFidAndUid(fidtoremove, uidtoremove);
        System.out.println("hello");
        String level = fu.getLevel();
        System.out.println(level);
        Long fuidtoremove = fu.getId();
        System.out.println(fuidtoremove);

        System.out.println("before:");
        for (FandomUser fus: fandom.getFandomuser()){
            System.out.println(fus.getLevel());
        }
        for (FandomUser fus: fandom.getFandomuser()){
            if (fus.getId().equals(fuidtoremove)){
                fandom.removeFandomUser(fus);
                break;
            }
        }
        System.out.println("after:");
        for (FandomUser fus: fandom.getFandomuser()){
            System.out.println(fus.getLevel());
        }

        System.out.println("before:");
        for (FandomUser fus: user.getFandomUsers()){
            System.out.println(fus.getLevel());
        }
        System.out.println(fandom.getFandomuser());
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

    @CrossOrigin(origins ="*")
    @GetMapping(path="/findUserInFandom") // Find if this user is in fandom
    @ResponseBody
    public Boolean findUser (@RequestParam Long userId, @RequestParam Long fandomId) {
        //Fandom fandom = findFandomById(fandomId);
        FandomUser fu = fuservice.findByFidAndUid(fandomId, userId);
        if (fu.equals(null)){
            return null;
        }else{
            return true;
        }
    }

    @CrossOrigin(origins ="*")
    @GetMapping(path="/findFandomInUser") // Find if this user is in fandom
    @ResponseBody
    public List<Fandom> findFandomsByUsers (@RequestParam Long userId) {

        List<Fandom> fandoms = new ArrayList<>();
        //Fandom fandom = findFandomById(fandomId);
        List<FandomUser> fus = fuservice.findListOfFandomsByUserId(userId);
        //
        for (FandomUser elem: fus){
            fandoms.add(elem.getFandom());
        }
        return fandoms;
    }
}
