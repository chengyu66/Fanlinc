package backend.src.main.java.com.fanlinc.fanlinc.fandom;

import org.springframework.data.repository.CrudRepository;


public interface FandomRepository extends CrudRepository<Fandom, Long> {
    Fandom findByFandomName(String fandomId);
    Fandom findByFandomId(Long id);
}
