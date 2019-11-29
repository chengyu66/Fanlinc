package com.fanlinc.fanlinc.fandomUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface fandomUserRepository extends CrudRepository<FandomUser, Long>{
    FandomUser findByFandomFandomIdAndUserId(Long fid, Long uid);
    List<FandomUser> findByUserId(Long uid);
}
