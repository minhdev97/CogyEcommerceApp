package com.cogy_ecommerce_service.mock_up_data;

import com.cogy_ecommerce_service.entity.Category;
import com.cogy_ecommerce_service.entity.Color;
import com.cogy_ecommerce_service.entity.Photo;
import com.cogy_ecommerce_service.entity.Product;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.entity.Size;
import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.payload.response.MessageResponseDTO;
import com.cogy_ecommerce_service.repository.CartLineRepository;
import com.cogy_ecommerce_service.repository.CategoryRepository;
import com.cogy_ecommerce_service.repository.ColorRepository;
import com.cogy_ecommerce_service.repository.ProductRepository;
import com.cogy_ecommerce_service.repository.SizeRepository;
import com.cogy_ecommerce_service.repository.SubCategoryRepository;
import com.cogy_ecommerce_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mock-up-data")
@CrossOrigin("*")
@Transactional
public class MockUpDataController {

    private final ProductRepository productRepository;

    private final SubCategoryRepository subCategoryRepository;

    private final UserRepository userRepository;

    private final SizeRepository sizeRepository;

    private final ColorRepository colorRepository;

    private final CartLineRepository cartLineRepository;

    private final CategoryRepository categoryRepository;

    @PostMapping
    public ResponseEntity<?> fakeData() {
        try {
            List<User> salesmanList = userRepository.findAll().stream().filter(user -> user.getSeller() != null).toList();
            List<Category> categories = categoryRepository.findAll();
            for (User user : salesmanList) {
                Seller seller = user.getSeller();
                for (int i = 1; i < 20; i++) {
                    List<SubCategory> subCategoryList = (List<SubCategory>) categories
                            .get(generateRandomNumber(0, categories.size() - 1))
                            .getSubCategories();
                    SubCategory subCategory = subCategoryList.get(generateRandomNumber(0, subCategoryList.size() - 1));
                    List<String> urls = MockUpData.MAP_URL_MOCK_UP.get(subCategory.getName());
                    String image = urls.get(Math.toIntExact(generateRandomNumber(0, urls.size() - 1)));
                    Product product = Product
                            .builder()
                            .id(UUID.randomUUID())
                            .name("Product " + subCategory.getName() + " number " + i)
                            .image(image)
                            .description("This product was created by fake data api!")
                            .view(((long) i * generateRandomNumber(100, 200)))
                            .subCategory(subCategory)
                            .numberOfPurchase(((long) i * generateRandomNumber(10, 20)))
                            .definitionOfColor("Color")
                            .definitionOfSize("Size")
                            .creationTime(LocalDateTime.now())
                            .isShown(true)
                            .active(true)
                            .seller(seller)
                            .build();
                    List<Photo> photos = new ArrayList<>(
                            generatePhotos(urls).stream().peek(photo -> photo.setProduct(product)).toList()
                    );
                    product.setPhotos(photos);
                    List<Variant> variants = new ArrayList<>(
                            generateVariants().stream().peek(variant -> {
                                variant.setProduct(product);
                            }).toList()
                    );
                    variants.sort(Comparator.comparingDouble(Variant::getSalePrice));
                    product.setVariants(variants);
                    product.setMinPriceOfVariants(variants.get(0).getSalePrice());
                    product.setMaxPriceOfVariants(variants.get(variants.size() - 1).getSalePrice());
                    productRepository.save(product);
                }
            }
            return new ResponseEntity<>(new MessageResponseDTO("Mock up data successfully!"), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageResponseDTO("Sorry! Mock up data failed!"), HttpStatus.CREATED);
        }

    }


    private List<Size> generateSizes() {
        List<Size> sizes = new ArrayList<>();
        sizes.add(new Size(UUID.randomUUID(), "XS", true, null));
        sizes.add(new Size(UUID.randomUUID(), "S", true, null));
        sizes.add(new Size(UUID.randomUUID(), "M", true, null));
        sizes.add(new Size(UUID.randomUUID(), "L", true, null));
        sizes.add(new Size(UUID.randomUUID(), "XL", true, null));
        sizes.add(new Size(UUID.randomUUID(), "XXL", true, null));
        return sizeRepository.saveAll(sizes);
    }


    private List<Color> generateColors() {
        List<Color> colors = new ArrayList<>();
        colors.add(new Color(UUID.randomUUID(), "Trắng", true, null));
        colors.add(new Color(UUID.randomUUID(), "Đen", true, null));
        colors.add(new Color(UUID.randomUUID(), "Xám", true, null));
        colors.add(new Color(UUID.randomUUID(), "Xanh", true, null));
        colors.add(new Color(UUID.randomUUID(), "Đỏ", true, null));
        colors.add(new Color(UUID.randomUUID(), "Hồng", true, null));
        return colorRepository.saveAll(colors);
    }


    private List<Variant> generateVariants() {
        List<Size> sizes = generateSizes();
        List<String> customSize = Arrays.asList("XS", "S", "M", "L", "XL", "XXL");
        sizes.sort(Comparator.comparingInt(size -> customSize.indexOf(size.getName())));
        List<Color> colors = generateColors();
        List<Variant> variants = new ArrayList<>();
        int randomPrice = 1000 * generateRandomNumber(5, 10);
        for (Size size : sizes) {
            for (Color color : colors) {
                variants.add(
                        Variant.builder()
                                .id(UUID.randomUUID())
                                .importPrice((double) randomPrice)
                                .salePrice(randomPrice * 1.5)
                                .stock(generateRandomNumber(5, 1000))
                                .weight(500L)
                                .active(true)
                                .isShown(true)
                                .size(size)
                                .color(color)
                                .build()
                );
            }
            randomPrice = (int) (randomPrice * 1.05);
        }
        return variants;
    }


    public static int generateRandomNumber(int min, int max) {
        Random random = new Random();
        return (random.nextInt(max - min + 1) + min);
    }


    public static List<Photo> generatePhotos(List<String> urls) {
        List<Photo> photos = new ArrayList<>();
        for (int i = 0; i < 9; i++) {
            photos.add(Photo.builder()
                    .id(UUID.randomUUID())
                    .url(urls.get(Math.toIntExact(generateRandomNumber(0, urls.size() - 1))))
                    .build());
        }
        return photos;
    }


}
