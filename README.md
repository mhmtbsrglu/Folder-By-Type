<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/abbfca06-fcd2-47b0-96ec-b4c08d850d39" />

Junior iken React öğrendiğim zamanlar mimari hakkında bilgim olmadan ezbere giderdim. Bu hatayı çoğumuz yaşar çünkü doğru kaynak bulmak zordur.
Klasörleri nasıl organize edeceğimi bilmeden, gördüğüm örnek projeleri taklit ederek ilerliyordum. components, utils, services gibi klasörler oluşturuyordum ama neden bu şekilde ayırdığımı, hangi dosyanın nereye gitmesi gerektiğini gerçekten anlamıyordum. Proje büyüdükçe bu eksik anlayışın bedelini ödüyordum: dağınık kod, nereye ne koyduğumu unutmak, aynı işi yapan fonksiyonları farklı yerlerde tekrar tekrar yazmak.
Zamanla fark ettim ki mimari bilgisi, sadece "düzenli kod yazmak" değil, aynı zamanda neden o şekilde organize ettiğini savunabilmek. Mülakatlarda da en çok bu noktada zorlanıyoruz: kod yazabiliyoruz ama tercihlerimizin arkasındaki mantığı anlatamıyoruz. Bu yüzden benzer yoldan geçen junior, mid ve senior seviyedeki arkadaşlara bir referans noktası olması için ilgili dokümanı hazırladım. Aşağıda folder-by-type mimarisiyle ilgili, seviyeye göre ayrılmış öğretici soru ve cevapları bulabilirsiniz.

# Junior
### Folder By Type Mimarisi Nedir ?
Folder By Type, tür ve role göre react kodlarımızı veya dosyalarımızı ayırdığımız bir mimaridir.

### Folder By Type (Tipe Göre Klasörleme) Yapısı
* **`components/`**: Uygulama genelinde kullanılan, tekrar kullanılabilir (reusable) kullanıcı arayüzü (UI) bileşenlerini barındırır.
* **`assets/`**: Resimler, fontlar, SVG'ler ve logolar gibi statik dosyaları içerir.
* **`pages/`**: Yönlendirme (routing) mekanizmasına bağlı olan ana sayfa bileşenlerini tutar.
* **`hooks/`**: İş mantığını arayüzden ayırmak için oluşturulan özel React Hook'larını (`custom hooks`) barındırır.
* **`services/`**: Backend servisleri ile haberleşmeyi sağlayan API istemcilerini (Axios konfigürasyonu, istek fonksiyonları vb.) içerir.
* **`store/`**: Uygulama genelindeki global state yönetim araçlarının (Redux Toolkit, Zustand vb.) yapılandırma ve slice dosyalarını barındırır.
* **`context/`**: Bileşenler arası veri paylaşımı sağlayan React Context API tanımlamalarını tutar.
* **`styles/`**: Global CSS, SASS veya Tailwind CSS konfigürasyonları gibi stil dosyalarını barındırır.
