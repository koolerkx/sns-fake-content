DOWNLOAD_DATA_PATH = './processed_data/transformer_datasets'

.PHONY: download-processed-data
download-processed-data:
	cd $(DOWNLOAD_DATA_PATH) && wget https://www.dropbox.com/s/1pmeujgfkcnn099/fnn_2xs.zip
	cd $(DOWNLOAD_DATA_PATH) && wget https://www.dropbox.com/s/vvve5szmbwauv7i/fnn_3xs.zip
	cd $(DOWNLOAD_DATA_PATH) && wget https://www.dropbox.com/s/dgy7bs390wdj8w6/fnn_l.zip
	cd $(DOWNLOAD_DATA_PATH) && wget https://www.dropbox.com/s/ciboc9k2n5x5k7x/fnn_m.zip
	cd $(DOWNLOAD_DATA_PATH) && wget https://www.dropbox.com/s/9ge4ufi97ymp3tp/fnn_s.zip
	cd $(DOWNLOAD_DATA_PATH) && wget https://www.dropbox.com/s/t1koz113jj6yrsf/fnn_xl.zip
	cd $(DOWNLOAD_DATA_PATH) && wget https://www.dropbox.com/s/ngsy543vxfxbcn5/fnn_xs.zip

.PHONY: setup
setup:
	make download-processed-data